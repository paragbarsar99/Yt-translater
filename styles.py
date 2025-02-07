import streamlit as st

def apply_styles():
    """Apply custom CSS styles to the Streamlit app."""
    st.markdown("""
        <style>
        /* Main container */
        .main {
            padding: 2rem;
        }
        
        /* Headers */
        h1 {
            color: #1E1E1E;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        
        /* Input fields */
        .stTextInput > div > div > input {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 0.5rem;
        }
        
        /* Buttons */
        .stButton > button {
            width: 100%;
            padding: 0.5rem 1rem;
            font-weight: 600;
            border-radius: 0.5rem;
        }
        
        /* Success messages */
        .success {
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 1rem 0;
        }
        
        /* Error messages */
        .error {
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 1rem 0;
        }
        
        /* Summary container */
        .block-container {
            max-width: 1200px;
            padding: 2rem;
        }
        
        /* Footer */
        footer {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #ddd;
            text-align: center;
        }
        </style>
    """, unsafe_allow_html=True)
