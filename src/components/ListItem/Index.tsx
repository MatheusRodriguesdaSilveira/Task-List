import { useState } from 'react';
import * as C from './styles';
import { Item } from '@/types/item';
import { CheckCircle, Circle, X } from 'lucide-react';

type Props = {
    item: Item;
    onRemove: (id: number) => void;
}

export const ListItem = ({ item, onRemove }: Props) => {
    const [isChecked, setIsChecked] = useState(item.done);

    const handleRemoveClick = () => {
        onRemove(item.id);
    };

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <C.Container done={isChecked}>
            <div className='rounded-xl flex items-center shadow-shape w-full'>
                <div className='flex items-center gap-2 flex-1 h-8'>
                    <input 
                        type='checkbox' 
                        checked={isChecked}
                        onChange={e => setIsChecked(e.target.checked)}
                    />
                    <div onClick={handleCheckboxClick} style={{ cursor: 'pointer' }}>
                        {isChecked ? (
                            <CheckCircle className='text-lime-500' />
                        ) : (
                            <Circle className='text-gray-500' />
                        )}
                    </div>
                    <label>{item.name}</label>
                </div>
                <button type="button" onClick={handleRemoveClick} style={{ cursor: 'pointer' }} className="ml-auto">
                    <X className="size-6 text-zinc-400" />
                </button>
            </div>
        </C.Container>
    );
}
