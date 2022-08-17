import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

export default function Editor({ editorText, handleChange }) {
    return (
        <div>
            <ReactQuill
                theme='snow'
                value={editorText}
                onChange={(e) => handleChange(e)}
                modules={{
                    toolbar: {
                        container: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                            { 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image', 'video'],
                            ['clean']
                        ]
                    }
                }}
                style={{ minHeight: '200px', margin: '4px' }}

            />
        </div>
    );
}