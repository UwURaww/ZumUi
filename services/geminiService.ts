import { GoogleGenAI, Type } from "@google/genai";
import type { Settings } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        luaCode: {
            type: Type.STRING,
            description: "The complete Lua script for the Roblox UI.",
        },
        previewHtml: {
            type: Type.STRING,
            description: "The HTML with Tailwind CSS for the web preview.",
        },
    },
    required: ["luaCode", "previewHtml"],
};

export async function generateRobloxUI(
    base64ImageData: string,
    mimeType: string,
    settings: Settings
): Promise<{ luaCode: string; previewHtml: string }> {
    
    const prompt = `
    You are an expert Roblox UI designer and senior Lua developer. Your task is to analyze an image of a UI design and convert it into a functional Roblox GUI script and an HTML/CSS preview based on the user's settings.

    User settings: ${JSON.stringify(settings, null, 2)}

    **LUA CODE INSTRUCTIONS:**
    Generate code as a **${settings.generateAsLibrary ? 'ModuleScript' : 'LocalScript'}**.

    **1. Core Structure:**
    - Create a ScreenGui named '${settings.parentGuiName || 'GeneratedUI'}' and parent it to PlayerGui. It must have 'IgnoreGuiInset' set to true.
    - For every UI element in the image, create the corresponding Roblox instance (TextButton, ImageLabel, Frame, etc.).
    - **Responsiveness is CRITICAL:** Use 'UDim2' for position and size, prioritizing 'Scale' over 'Offset'. Set 'AnchorPoint' appropriately (e.g., (0.5, 0.5) for centering).
    - Match visual properties (BackgroundColor3, TextColor3, Text, Font, TextSize, etc.) to the image.

    **2. Sound Design:**
    - Create a 'Folder' named 'Sounds' in the ScreenGui.
    - Click Sound: If '${settings.clickSoundId}' is not empty, create a 'Sound' instance named 'ClickSound' with this ID. For *every* button, connect 'MouseButton1Click' to play this sound.
    - Open Sound: If '${settings.openSoundId}' is not empty, create a 'Sound' named 'OpenSound'. Play it when the UI becomes visible.
    - Close Sound: If '${settings.closeSoundId}' is not empty, create a 'Sound' named 'CloseSound'. Play it when the UI becomes hidden.

    **3. Behavior (based on settings):**
    - **isDraggable: ${settings.isDraggable}**: If true, make the main container frame draggable using 'UserInputService'.
    - **isToggleable: ${settings.isToggleable}**: 
        - The UI's visibility should be toggled by pressing the **${settings.toggleKeybind}** key. Listen for 'UserInputService.InputBegan'.
        - If you identify a "close" or "X" button, also connect its click event to hide the GUI.
        - **addMobileToggleButton: ${settings.addMobileToggleButton}**: If true, create a *separate* ScreenGui named 'ToggleUI' with a TextButton in a corner. This button should remain visible always and toggle the main UI's visibility. This provides a mobile-friendly way to toggle.
    - **introAnimation: "${settings.introAnimation}"**: If not 'None', use 'TweenService' to animate the main frame when it first appears.
        - 'FadeIn': Tween transparency from 1 to final value.
        - 'SlideDown': Tween 'Position' from off-screen Y to final position.
        - 'Grow': Tween 'Size' from (0,0) to final size.
    
    **4. Metadata (based on settings):**
    - **title: "${settings.title}"**: If a title is provided, find or create a 'TextLabel' for it.
    - **signature: "${settings.signature}"**: If a signature is provided, create a small 'TextLabel' and position it according to **signaturePosition: "${settings.signaturePosition}"**. Add padding so it's not flush with the edge.

    **5. Notifications (based on settings):**
    - **notification.enabled: ${settings.notification.enabled}**: If true, create a notification system.
        - Create a hidden Frame for the notification, styled nicely.
        - Create a function 'showNotification(text, duration)' that tweens the notification visible, waits, and tweens it out.
        // FIX: Escaped backticks to prevent template literal parsing issues.
        - On script startup, call this function with: \\\`showNotification("${settings.notification.text}", ${settings.notification.duration})\\\`.

    **6. SCRIPT TYPE SPECIFIC INSTRUCTIONS:**

    **IF LocalScript (generateAsLibrary: false):**
    - All logic should be self-contained in the LocalScript.
    - The script should run immediately when the player joins.

    **IF ModuleScript (generateAsLibrary: true):**
    - The script must return a table (the library).
    - Do not create the UI until a function is called.
    - The returned library table MUST have the following functions:
        - \`Library.load()\`: Creates the UI and parents it to PlayerGui. Should only be called once.
        - \`Library.show()\`: Makes the UI visible. Plays open sound.
        - \`Library.hide()\`: Makes the UI invisible. Plays close sound.
        - \`Library.toggle()\`: Toggles visibility.
        // FIX: Escaped backticks to prevent template literal parsing issues.
        - \\\`Library.showNotification(text, duration)\\\`: Shows a custom notification.
        - \`Library.destroy()\`: Destroys all UI elements.
    // FIX: Escaped backticks to prevent template literal parsing issues.
    - Add extensive comments at the top explaining how to use the library from a LocalScript (e.g., \\\`local MyUI = require(path.to.ModuleScript)\\\` and then \\\`MyUI.load()\\\`, \\\`MyUI.show()\\\`).

    **HTML/CSS PREVIEW INSTRUCTIONS:**

    - Generate a single HTML structure using 'div' elements and Tailwind CSS.
    - **DO NOT** include \`<html>\`, \`<head>\`, or \`<body>\` tags.
    - Use absolute positioning with percentages to mimic the responsive Roblox layout.
    - Match colors and styles from the image.
    - The preview is static; do not implement animations or sounds in the HTML.

    **Output Format:**
    Respond with a single JSON object that strictly adheres to the provided schema. Do not add any extra text, explanations, or markdown formatting.
    `;

    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };
    
    const textPart = { text: prompt };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [textPart, imagePart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
}