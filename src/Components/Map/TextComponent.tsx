interface TextConstructor {
    id: number;
    text: string;
}

export const TextComponent = (props: TextConstructor) => {
    return (
        <div data-testid={'TextComponent' + props.id}>
            {props.text ?? ''}
        </div>
    )
}