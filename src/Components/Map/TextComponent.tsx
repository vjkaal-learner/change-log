import Skeleton from "@mui/material/Skeleton";
import './TextComponent.css'

interface TextConstructor {
    id: number;
    text: string;
    loading: boolean;
}

const TextComponent = (props: TextConstructor) => {
    return (
        <div
            data-testid={'TextComponent' + props.id}
            className='TextComponent'
            title={props.text}
        >
            {props.loading ?
              <Skeleton variant={'text'} animation={'wave'}/>
              : (props.text)}
        </div>
    )
}
export default TextComponent