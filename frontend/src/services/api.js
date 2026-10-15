
const API_BASE_URL = "http://127.0.0.1:8000";

export async function createConversation(title = "New Conversation") {
  const response = await fetch(`${API_BASE_URL}/api/conversations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create conversation (${response.status})`);
  }

  return response.json();
}

export async function sendChatMessage(conversationId, message) {
  const response = await fetch(`${API_BASE_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      message,
    }),
  });

 if (!response.ok) {
  const errorBody = await response.text();

  console.error("CHAT API ERROR:", response.status, errorBody);

  throw new Error(
    `Failed to send message (${response.status}): ${errorBody}`
  );
}

  return response.json();
}

export async function getConversationMessages(conversationId) {
  const response = await fetch(
    `${API_BASE_URL}/api/conversations/${encodeURIComponent(conversationId)}/messages`
  );

  if (!response.ok) {
    throw new Error(`Failed to load messages (${response.status})`);
  }

  return response.json();
}


export async function getExecutionStatus(executionId) {
  const response = await fetch(
    `${API_BASE_URL}/api/executions/${encodeURIComponent(executionId)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to get execution status (${response.status})`);
  }

  return response.json();
}

export async function getExecutionEvents(executionId) {
  const response = await fetch(
    `${API_BASE_URL}/api/executions/${encodeURIComponent(executionId)}/events`
  );

  if (!response.ok) {
    throw new Error(`Failed to get execution events (${response.status})`);
  }

  return response.json();
}
