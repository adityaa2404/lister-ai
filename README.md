# ⚡ Lister AI

Empowering electricians and site professionals to generate **accurate, categorized material lists** instantly from voice — powered by **Whisper AI** and **Gemini LLM**.

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Async-green?logo=fastapi)
![Whisper](https://img.shields.io/badge/Whisper-AI_Speech_to_Text-8A2BE2?logo=openai)
![Gemini](https://img.shields.io/badge/Gemini-Google_LLM-yellow?logo=google)
![React](https://img.shields.io/badge/React-TypeScript-blue?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Design_System-38BDF8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Frontend_Hosting-black?logo=vercel)

---



## 📘 Overview

**Core Problem:**  
Electricians and contractors face repetitive, error-prone manual work in preparing electrical material lists. Totalling, categorizing, and validating hundreds of items by hand is time-consuming and often inaccurate.

**Our Solution:**  
**Lister AI** transforms spoken lists into organized, validated Excel sheets.  
Users simply upload an **audio file**, and within seconds, they receive a **structured, auto-totaled Excel file** — all powered by AI.

**Core Technology:**  
Speech-to-text via **Whisper AI**, intelligent parsing and categorization via **Google Gemini**, and automated sheet generation via **FastAPI backend**.

---

## ⚡ Key Features
- 🎤 **Voice-Based Input:** Upload recorded lists — no typing required.
- 🧠 **AI-Powered Understanding:** Combines Whisper AI + Gemini LLM for transcription and item classification.
- 📊 **Instant Excel Output:** Generates downloadable Excel files with categorized materials and totals.
- ⚙️ **Smart Validation:** Detects duplicates, corrects item names, and merges counts automatically.
- 💻 **Modern UI:** Built with React (TypeScript) + TailwindCSS.
- 🚀 **Deployed Frontend:** Hosted on **Vercel**, connected to local FastAPI backend.

---

## 🧩 System Architecture

### 🎙️ Input Pipeline
1. **Audio Upload** (Frontend)  
2. **Whisper AI** → Transcription  
3. **Gemini LLM** → Cleaning, Categorization, and Quantity Extraction  

### 📊 Output Pipeline
1. **FastAPI** processes parsed data  
2. **Pandas + OpenPyXL** generates Excel  
3. **Frontend** provides instant download  

```plaintext
🎧 Voice Input → Whisper AI → Gemini LLM → Excel Generator → 📥 Download File
