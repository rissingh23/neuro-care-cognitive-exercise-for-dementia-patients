# NeuroCare  
*An Expo-powered mobile app for cognitive exercises in dementia care*

<p align="center">
  <!-- Swap these out with real badges/screenshots when ready -->
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue.svg" alt="Platform" />
  <img src="https://img.shields.io/badge/Expo-Managed%20Workflow-yellow.svg" alt="Expo" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-green.svg" alt="FastAPI" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey.svg" alt="License" />
</p>

---

## 🎯 Overview

NeuroCare is a cross-platform mobile application designed to help dementia patients maintain and improve their cognitive abilities through engaging, scientifically-backed exercises. Built with Expo (React Native) on the frontend and FastAPI in the backend, NeuroCare delivers a seamless experience on both iOS and Android devices.
[
<p align="center">
  <!-- Placeholder for a hero screenshot -->
<img width="351" alt="image1" src="https://github.com/user-attachments/assets/ede5ee8d-cd2e-47e6-b7eb-60a8ba7989ec" />
<img width="359" alt="image" src="https://github.com/user-attachments/assets/6cd38bfe-bf0f-434c-9c08-df590a1bdc4d" />

</p>
---

## 🚀 Features

- 🧠 **Memory Matching Game**  
  Flip cards to find matching pairs—improves short-term memory and attention span.

- 🔢 **Number Sequence Recall**  
  Watch a sequence of numbers light up, then reproduce it—enhances working memory.

- 🔤 **Word Quiz**  
  Simple word-association quizzes to stimulate language centers.

- 🎨 **Color & Shape Sorting**  
  Drag-and-drop shapes into matching outlines—strengthens visual perception.

- 📊 **Progress Tracking Dashboard**  
  Tracks completed exercises, accuracy, and reaction times over days/weeks.

---

## 🏗 Architecture

neuro-care-cognitive-exercise-for-dementia-patients/
├── Backend/ # FastAPI server
│ ├── .venv/ # Python virtual environment
│ ├── app/ # API endpoints, models, services
│ ├── requirements.txt # Python deps
│ └── README.md # (Backend-specific docs)
├── Frontend/ # Expo React Native app
│ ├── assets/ # Images, icons, fonts
│ ├── components/ # Reusable UI pieces
│ ├── screens/ # All app screens
│ ├── App.tsx # Entry point
│ └── package.json # JS deps & scripts
├── .gitignore
└── README.md # ← you are here


---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** ≥ 16.x  
- **npm** (bundled with Node) or **Yarn**  
- **Expo CLI**:  
  ```bash
  npm install --global expo-cli
Python ≥ 3.9
pip
Virtualenv (optional but recommended)
Installation
Clone the repo
git clone https://github.com/rissingh23/neuro-care-cognitive-exercise-for-dementia-patients.git
cd neuro-care-cognitive-exercise-for-dementia-patients
Backend Setup
cd Backend
python -m venv .venv
source .venv/bin/activate         # macOS/Linux
.venv\Scripts\activate            # Windows
pip install -r requirements.txt
Copy .env.example → .env and fill in any secrets (e.g., DATABASE_URL, JWT_SECRET).
Frontend Setup
cd ../Frontend
npm install                       # or yarn install
🎬 Running the App

Start Backend
cd Backend
uvicorn app.main:app --reload
The API will be available at http://localhost:8000.
Start Frontend
cd Frontend
expo start
Scan the QR code in your Expo Go app or run on an emulator.
📈 Progress Dashboard

<p align="center"> <!-- Placeholder for a chart or dashboard screenshot --> <img src="./screenshots/dashboard.png" alt="Progress Dashboard" width="300" /> </p>
🤝 Contributing

Fork this repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add SomeFeature')
Push to the branch (git push origin feature/YourFeature)
Open a Pull Request
Please read CONTRIBUTING.md for more details on our code of conduct, and the process for submitting pull requests.

📄 License

This project is licensed under the MIT License. See LICENSE for details.

✉️ Contact

Rishabh Singh

GitHub: @rissingh23
Email: rishabh.singh@example.com
Feel free to open an issue or drop me an email with any questions or suggestions!
