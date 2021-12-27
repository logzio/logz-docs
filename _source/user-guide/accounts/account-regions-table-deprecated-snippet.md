Available regions
Your listener host and API host will always be in the same region as your account.

introduce table text 

| Region | Cloud | Logz.io account host | Listener host | API host | Region code | Region slug |
|---|---|---|
| US East (Northern Virginia)|	AWS	|app.logz.io	|listener.logz.io	|api.logz.io| | us-east-1|	 
|Asia Pacific (Sydney)|	AWS	|app-au.logz.io|	listener-au.logz.io	|api-au.logz.io|	au |ap-southeast-2 |
|Canada (Central)	|AWS	|app-ca.logz.io	|listener-ca.logz.io	|api-ca.logz.io	|ca|ca-central-1 |
|Europe (Frankfurt)|	AWS	|app-eu.logz.io	| listener-eu.logz.io|	api-eu.logz.io	|eu |eu-central-1 |
|West Europe (Netherlands)|	Azure	|app-nl.logz.io|	listener-nl.logz.io	|api-nl.logz.io| nl | westeurope|
|Europe (London)	|AWS	|app-uk.logz.io	| listener-uk.logz.io|	api-uk.logz.io | uk| eu-west-2 |
|West US 2 (Washington)|	Azure	|app-wa.logz.io	|listener-wa.logz.io	|api-wa.logz.io|	wa | westus2|




Your listener host and API host will always be in the same region as your account.

| Region | Cloud | Logz.io account host | Listener host | API host | Region code |
|---|---|---|
{% for r in regions -%}
  {%- if r.suffix -%}
      {%- assign suffix = r.suffix | prepend: "-" -%}
    {%- else -%}
      {%- assign suffix = "" -%}
  {%- endif -%}
| {{r.title}} | {{r.cloud}} | app{{suffix}}.logz.io | listener{{suffix}}.logz.io | api{{suffix}}.logz.io | {{suffix | replace: "-", ""}} |
{% endfor -%}