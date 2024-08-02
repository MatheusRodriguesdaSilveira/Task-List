import { PlusCircle, X } from 'lucide-react'
import * as C from './styles'
import { useState, KeyboardEvent } from 'react'

type Props = {
    onEnter: (taskName: string) => void
}

export const AddArea = ({ onEnter }: Props) =>{
    const [inputText, setInputText] = useState('')

    const handleKeyUp = (e: KeyboardEvent) =>{
        if(e.code == 'Enter' && inputText !== ''){
            onEnter(inputText)
            setInputText('')
        }
    }
    return(
        <C.Container>
            <div className='image'> <PlusCircle /> </div>
            <input 
                type="text" 
                placeholder='Add a new task'
                value={inputText}
                onChange={e=>setInputText(e.target.value)} 
                onKeyUp={handleKeyUp}
            />
        </C.Container>
    )
}