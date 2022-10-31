The `tail_sampling` defines the decision to sample a trace after the completion of all the spans in a request. This processor includes the following parameters, which you can configure, if required:

| Parameter | Description | Default |
|---|---|---|
| threshold_ms | Threshold for the spand latency - all traces slower than the threshold value will be filtered in. | 1000 |
| sampling_percentage | Sampling percentage for the probabilistic policy. | 10 |
