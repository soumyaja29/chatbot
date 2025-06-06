'use server';

/**
 * @fileOverview This file defines a Genkit flow for customizing chatbot responses based on user preferences.
 *
 * - improveResponse - A function that enhances chatbot responses based on specified tone and style.
 * - ImproveResponseInput - The input type for the improveResponse function.
 * - ImproveResponseOutput - The return type for the improveResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResponseInputSchema = z.object({
  originalResponse: z.string().describe('The original response generated by the chatbot.'),
  tone: z.string().describe('The desired tone of the response (e.g., formal, informal, friendly).').optional(),
  style: z.string().describe('The desired style of the response (e.g., concise, detailed, humorous).').optional(),
});

export type ImproveResponseInput = z.infer<typeof ImproveResponseInputSchema>;

const ImproveResponseOutputSchema = z.object({
  improvedResponse: z.string().describe('The improved chatbot response based on the specified tone and style.'),
});

export type ImproveResponseOutput = z.infer<typeof ImproveResponseOutputSchema>;

export async function improveResponse(input: ImproveResponseInput): Promise<ImproveResponseOutput> {
  return improveResponseFlow(input);
}

const improveResponsePrompt = ai.definePrompt({
  name: 'improveResponsePrompt',
  input: {schema: ImproveResponseInputSchema},
  output: {schema: ImproveResponseOutputSchema},
  prompt: `You are an AI assistant that improves chatbot responses based on user preferences for tone and style.

  Original Response: {{{originalResponse}}}

  {% if tone %}Tone: {{{tone}}}{% endif %}
  {% if style %}Style: {{{style}}}{% endif %}

  Improved Response:`, 
});

const improveResponseFlow = ai.defineFlow(
  {
    name: 'improveResponseFlow',
    inputSchema: ImproveResponseInputSchema,
    outputSchema: ImproveResponseOutputSchema,
  },
  async input => {
    const {output} = await improveResponsePrompt(input);
    return output!;
  }
);
