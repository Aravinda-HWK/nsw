package plugins

import (
	"encoding/json"
	"fmt"
	"log/slog"
)

// APICallPlugin implements the "generic_api_call" FIRE_AND_FORGET task type.
// It POSTs the submission envelope to a configured URL, logs the response, and
// transitions the task to DISPATCHED regardless of whether the call succeeds.
type APICallPlugin struct {
	client *dispatchClient
}

func NewAPICallPlugin(backendBaseURL string, devMode bool) *APICallPlugin {
	return &APICallPlugin{client: newDispatchClient(backendBaseURL, devMode)}
}

func (p *APICallPlugin) Name() string { return "generic_api_call" }

type apiCallConfig struct {
	URL string `json:"url"`
}

func (p *APICallPlugin) Execute(ctx pluginContext, configRaw json.RawMessage) error {
	var cfg apiCallConfig
	if err := json.Unmarshal(configRaw, &cfg); err != nil {
		return fmt.Errorf("api_call: invalid config: %w", err)
	}
	if cfg.URL == "" {
		return fmt.Errorf("api_call: url is required")
	}

	ctx.Record.Status = "DISPATCHED"

	body := buildSubmissionBody(ctx.Record, nil, p.client.callbackTasksURL())

	slog.Info("taskv2 api_call: dispatching to external API",
		"taskId", ctx.Record.TaskID, "url", cfg.URL)

	return p.client.post(ctx.Context, cfg.URL, body)
}
