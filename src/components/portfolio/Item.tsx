import Date from "../Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import { ItemContent } from "../../lib/exp_item";


type Props = {
    post: ItemContent;
};
export default function Item({ post }: Props) {
    return (
        <div className="post-item">
            <Date date={parseISO(post.date)} />
            <div>{post.title}</div>
            <div>{post.description}</div>
            <style jsx>
                {`
                    .post-item {
                        display: flex;
                        flex-direction: column;
                        margin-top: 1.5rem;
                    }
                    a {
                    color: #222;
                    display: inline-block;
                    }
                    h2 {
                    margin: 0;
                    font-weight: 500;
                    }
                `}
            </style>
        </div>
    );
}
