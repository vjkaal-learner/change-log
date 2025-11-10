import Skeleton from "@mui/material/Skeleton";
import './DateComponent.css'

interface DateConstructor {
    id: number;
    date: string;
    loading: boolean;
}

export const DateComponent = (props: DateConstructor) => {
    console.log(props.loading);
    return (
        <div
            data-testid={'DateComponent-'+props.id}
            className='DateComponent'
        >
            {props.loading ?
              <Skeleton variant={'text'} animation={'wave'}/>
              : props.date}
        </div>
    )
}