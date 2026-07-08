import ApiRequest from "./MakeApi";

export const AiApi = {
  leadScore: (id) => ApiRequest.post(`/ai/lead-score/${id}`),

  generateEmail: (id) => ApiRequest.post(`/ai/email/${id}`),

  generateProposal: (id) => ApiRequest.post(`/ai/proposal/${id}`),
};
