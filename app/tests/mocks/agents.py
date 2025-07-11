class MockAgent:
    def __init__(self, input_data, tenant_id=None, tools=None, logger=None, metadata=None):
        self.input_data = input_data
        self.tenant_id = tenant_id
        self.tools = tools or {}
        self.logger = logger or (lambda *a, **kw: None)
        self.metadata = metadata or {}

    def run(self):
        return {
            "result": "task completed",
            "agent_name": "project_manager",
            "input": self.input_data,
            "tenant_id": self.tenant_id,
            "metadata": self.metadata,
        }

    def __call__(self):
        return self.run()
