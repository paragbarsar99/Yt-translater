import os
import streamlit as st
from utils import extract_video_id, get_video_transcript
from summarizer import generate_summary
import styles

def main():
    # Set page configuration
    st.set_page_config(
        page_title="YouTube Video Summarizer",
        page_icon="📺",
        layout="wide"
    )
    
    # Apply custom styles
    styles.apply_styles()
    
    st.title("📺 YouTube Video Summarizer")
    st.markdown("Get AI-powered summaries of YouTube videos in seconds!")

    # URL input
    url = st.text_input("Enter YouTube Video URL:", placeholder="https://www.youtube.com/watch?v=...")

    # Summary length selection
    summary_length = st.select_slider(
        "Select summary length:",
        options=["Short", "Medium", "Detailed"],
        value="Medium"
    )

    if st.button("Generate Summary", type="primary"):
        if not url:
            st.error("Please enter a YouTube URL")
            return

        try:
            with st.spinner("Extracting video transcript..."):
                video_id = extract_video_id(url)
                transcript = get_video_transcript(video_id)

            if not transcript:
                st.error("Could not extract transcript from this video. It might not have captions available.")
                return

            with st.spinner("Generating AI summary..."):
                summary = generate_summary(transcript, summary_length)

            # Display results
            st.success("Summary generated successfully!")
            
            # Display video thumbnail
            st.image(f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg", 
                    use_column_width=True)

            # Display summary
            st.subheader("Summary")
            st.markdown(summary)

        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

    # Add footer
    st.markdown("---")
    st.markdown("Made with ❤️ using Streamlit and OpenAI")

if __name__ == "__main__":
    main()
