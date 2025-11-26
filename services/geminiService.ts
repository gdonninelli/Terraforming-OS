import { GoogleGenAI } from "@google/genai";
import { GameState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStrategicAdvice = async (
  prompt: string,
  gameState: GameState
): Promise<string> => {
  try {
    const systemInstruction = `
      You are an expert strategic advisor for the board game Terraforming Mars. 
      Your goal is to provide concise, mathematical, and highly strategic advice.
      
      Current Game State:
      - TR: ${gameState.tr}
      - Generation: ${gameState.generation}
      - Global Parameters: Temp ${gameState.globalParameters.temperature}C, O2 ${gameState.globalParameters.oxygen}%, Oceans ${gameState.globalParameters.oceans}/9.
      - Production: M€ ${gameState.production.MegaCredits}, Steel ${gameState.production.Steel}, Titanium ${gameState.production.Titanium}, Plants ${gameState.production.Plants}, Energy ${gameState.production.Energy}, Heat ${gameState.production.Heat}.
      - Resources: M€ ${gameState.resources.MegaCredits}, Steel ${gameState.resources.Steel}, Titanium ${gameState.resources.Titanium}, Plants ${gameState.resources.Plants}, Energy ${gameState.resources.Energy}, Heat ${gameState.resources.Heat}.
      
      Analyze the user's specific query based on this state.
      Prioritize engine building in early game, and VP efficiency in late game.
      Be brief and direct. Use bullet points.
    `;

    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to strategic command. Please check your connection.";
  }
};

export const analyzeCorporationSetup = async (
  corp1: string,
  corp2: string,
  projectCards: string
): Promise<string> => {
    const prompt = `
      I have to choose between two corporations: ${corp1} and ${corp2}.
      I have these 10 project cards in my starting hand: ${projectCards}.
      
      Please analyze the synergy between the corporations and the cards.
      1. Which Corporation should I pick?
      2. Which cards should I keep (buy) vs discard?
      3. Explain the strategy briefly.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: "You are a Terraforming Mars grandmaster. Analyze setups for maximum efficiency.",
            temperature: 0.5
        }
      });
      return response.text || "Analysis failed.";
    } catch (e) {
        console.error(e);
        return "Could not perform analysis.";
    }
};