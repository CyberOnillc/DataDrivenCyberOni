/**
 * @jest-environment node
 */
import { describe, expect, it, afterAll } from "@jest/globals";
import { searchGpt } from "@/lib/externalRequests/openai";


describe('Testing sendgrid endpoint', () => {

    it('should successfully extract google search results', async () => {
      const resp =await searchGpt('Stabel diffusion')
      expect(resp.length).toBeGreaterThan(0)
    });
  
    
  
  });
  