import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Item from "../../components/portfolio/Item";
import { fetchAcademicContent, fetchItemContent, ItemContent } from "../../lib/exp_item";

type Props = {
    exp: ItemContent[];
    education: ItemContent[];
};

export default function Index({ exp, education }: Props) {
    const url = "/portfolio";
    const title = "Portfolio";
    return (
        <Layout>
            <BasicMeta url={url} title={title} />
            <OpenGraphMeta url={url} title={title} />
            <TwitterCardMeta url={url} title={title} />
            <div className={"container"}>
                <div className="exp-block">
                    <div className="title">Professional Experience</div>
                    {exp.map(
                        item => <Item item={item} />
                    )}
                    <div className="title">Education</div>
                    {education.map(
                        item => <Item item={item} />
                    )}
                </div>

                <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    margin: 0 auto;
                    max-width: 1200px;
                    width: 100%;
                    padding: 0 1.5rem;
                }
                .exp-block {
                    display: flex;
                    flex-direction: column;
                    margin: 0 auto;
                    max-width: 1200px;
                    width: 100%;
                    padding: 0 1.5rem;
                }
                .title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #222;
                    flex: 1;
                    margin-bottom: 0.25rem;
                    margin-top: 1rem;
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
    const education = fetchAcademicContent();
    return {
        props: {
            exp,
            education,
        },
    };
};
