'use client'
import { useState } from 'react';
const VoiceoverCreator = () => {
        // State to toggle between text and audio input
        const [inputType, setInputType] = useState('text');
        // State to store the text input
        const [text, setText] = useState('');
        // State to store the selected file
        const [file, setFile] = useState(null);
        // State to manage the select option
        const [option, setOption] = useState('');
    
        // Handler to switch input type
        const handleToggle = () => setInputType(inputType === 'text' ? 'audio' : 'text');
    
        // Handler for text change
        const handleTextChange = (e) => setText(e.target.value);
    
        // Handler for file change
        const handleFileChange = (e) => setFile(e.target.files[0]);
    
        // Handler for selecting option
        const handleOptionChange = (e) => setOption(e.target.value);
    
        // Submit handler
        const handleSubmit = (e) => {
            e.preventDefault();
            // Perform actions based on the input type
            console.log({
                type: inputType,
                content: inputType === 'text' ? text : file,
                option: option
            });
        };
    
        return (
            <div>
                <button onClick={handleToggle}>
                    Switch to {inputType === 'text' ? 'Audio Upload' : 'Text Input'}
                </button>
    
                {inputType === 'text' ? (
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        style={{ width: '100%', minHeight: '100px' }}
                        placeholder="Enter your text here"
                    />
                ) : (
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="audio/*"
                        style={{ width: '100%', display: 'block' }}
                    />
                )}
    
                <form onSubmit={handleSubmit}>
                    <button type="submit">
                        Submit
                        <select value={option} onChange={handleOptionChange}>
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </button>
                </form>
            </div>
        );
    };
    
  export default VoiceoverCreator;