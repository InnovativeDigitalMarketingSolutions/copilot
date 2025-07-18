"use client"

import * as React from "react"
import { Table } from "./ui/table"
import { useEffect, useState } from "react"

interface LlmUsageLog {
  timestamp: string
  model: string
  task_type: string
  input_tokens: number
  output_tokens: number
  latency: number
  cost_credits: number
}

interface LlmUsageTableProps {
  tenantId: string
}

export function LlmUsageTable({ tenantId }: { tenantId: string }) {
  const [logs, setLogs] = useState<LlmUsageLog[]>([])

  useEffect(() => {
    fetch(`/api/v1/llm-usage?tenant_id=${tenantId}`)
      .then(res => res.json())
      .then(data => setLogs(data.data))
  }, [tenantId])

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Timestamp</Table.Head>
          <Table.Head>Model</Table.Head>
          <Table.Head>Task</Table.Head>
          <Table.Head>Tokens</Table.Head>
          <Table.Head>Latency (s)</Table.Head>
          <Table.Head>Credits</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {logs.map((log, idx) => (
          <Table.Row key={idx}>
            <Table.Cell>{new Date(log.timestamp).toLocaleString()}</Table.Cell>
            <Table.Cell>{log.model}</Table.Cell>
            <Table.Cell>{log.task_type}</Table.Cell>
            <Table.Cell>{log.input_tokens + log.output_tokens}</Table.Cell>
            <Table.Cell>{log.latency}</Table.Cell>
            <Table.Cell>{log.cost_credits}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}