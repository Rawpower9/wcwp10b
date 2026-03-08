import { useState} from 'react';
import './Popup.css';

function Popup() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return <></>;

    return (
        <div className="popup" id="pop">
            <div id='close' onClick={() => setIsVisible(false)}>×</div>
            <h3 id='title'>
                This box is the only human written part of this website.
            </h3>
            <p>
                Once you click the "x" in the top right corner, this box will disappear. I gave claude code my research narrative and used the following prompt to generate this website:
                <br/><br/>
                <b>Prompt:</b>
                <br></br>
                Read final-draft.md and understand the essay. Then, create a react website that offers the way of seeing from the essay. It should make a statement about this way of seeing that is offered in visual rhetoric.
                This should be a visual representation of the position that the essay takes. This is very interpretive and may take many forms.
                Think through converting the essay into its visual representation. Know that this is a one pass task, so prioritize getting a complete website since there will be no future prompting.
            </p>
        </div>
    );
}

export default Popup;