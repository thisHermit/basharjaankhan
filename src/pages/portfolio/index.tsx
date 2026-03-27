import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Item from "../../components/portfolio/Item";
import { fetchItemContent, ItemContent } from "../../lib/exp_item";

type Props = {
    exp: ItemContent[];
};

export default function Index({ exp }: Props) {
    const url = "/portfolio";
    const title = "Portfolio";
    return (
        <Layout>
            <BasicMeta url={url} title={title} />
            <OpenGraphMeta url={url} title={title} />
            <TwitterCardMeta url={url} title={title} />
            <div className={"container"}>
                {exp.map(
                    item => <Item post={item} />
                )}
                <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    margin: 0 auto;
                    max-width: 1200px;
                    width: 100%;
                    padding: 0 1.5rem;
                }
                @media (min-width: 769px) {
                    .categories {
                    display: block;
                    }
                }
                `}</style>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const exp = fetchItemContent();
    return {
        props: {
            exp,
        },
    };
};
