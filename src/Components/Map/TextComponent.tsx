import './TextComponent.css'

interface TextConstructor {
    id: number;
    text: string;
}

const TextComponent = (props: TextConstructor) => {
    return (
        <div
            data-testid={'TextComponent' + props.id}
            className='TextComponent'
            title={props.text ?? ''}
        >
            {props.text ?? ''}
        </div>
    )
}
export default TextComponent