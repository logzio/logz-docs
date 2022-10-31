The `tail_sampling` defines the decision to sample a trace after the completion of all the spans in a request. This processor includes the following parameters, which you can configure, if required:

| Parameter | Description |
|---|---|
| Policies  | Sampling policies. |
| Name | Policy name. |
| Type | Type of the policy. `status_code` type filters spans by the status code. `latency` type files spans by latency. `probabilistic` filters spans by a definition, such as the sampling percentage. |
| status_codes | Status codes to include in the filtered spans. For example `{status_codes: [ERROR]}` only sends spans with the status code **ERROR**. |
| threshold_ms | Threshold for the spand latency - all traces slower than the threshold value will be filtered in. |
| sampling_percentage | Sampling percentage for the probabilistic policy. |