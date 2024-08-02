import { PlusCircle } from 'lucide-react';
import * as C from './styles';
import { useState, KeyboardEvent } from 'react';

type Props = {
    onEnter: (taskName: string) => void;
};

export const AddArea = ({ onEnter }: Props) => {
    const [inputText, setInputText] = useState('');

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter' && inputText.trim() !== '') {
            onEnter(inputText);
            setInputText('');
        }
    };

    const handleButtonClick = () => {
        if (inputText.trim() !== '') {
            onEnter(inputText);
            setInputText('');
        }
    };

    return (
        <C.Container>
            <div className='image'> 
                <PlusCircle className='text-lime-500' onClick={handleButtonClick} style={{ cursor: 'pointer' }} /> 
            </div>
            <input 
                type="text" 
                placeholder='Add a new task'
                value={inputText}
                onChange={e => setInputText(e.target.value)} 
                onKeyUp={handleKeyUp}
            />
        </C.Container>
    );
};
