import {DateComponent} from "./DateComponent";
import TextComponent from "./TextComponent";

import './Map.css';

export interface MapProps {
    date: string;
    text: string;
}

interface MapComponentProps {
    items: MapProps[];
    loading: boolean;
}

export const MapComponent = ({items, loading}: MapComponentProps) => {
    return (
        <div data-testid="Map" className="Map">
            {items?.map((logEntry, idx: number) => (
                <div
                    data-testid='MapItem'
                    className='MapItem'
                    key={idx}
                >
                    <DateComponent id={idx} date={logEntry.date} loading={loading} />
                    <span className={'dot'}></span>
                    <TextComponent id={idx} text={logEntry.text}  loading={loading} />
                </div>
            ))}
        </div>
    )
}