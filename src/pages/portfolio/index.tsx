import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Item from "../../components/portfolio/Item";
import { fetchAcademicContent, fetchItemContent, fetchLanguage, fetchCerts, ItemContent, SkillsAndCerts, CertContent } from "../../lib/exp_item";
import CertItem from "../../components/portfolio/CertItem";
import LangTable from "../../components/portfolio/LangTable";

type Props = {
    exp: ItemContent[];
    education: ItemContent[];
    certs: CertContent[];
    langs: string[][];
};

export default function Index({ exp, education, certs, langs }: Props) {
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
                    <div className="title">Certificates</div>
                    {certs.map(
                        item => <CertItem item={item} />
                    )}
                    <div className="langs-grid">
                        Click on the row marked with a * below to see more details.
                        {Object.keys(langs).map((key) => (
                            <div key={key} className="langs-column">
                                <div className="category-title">{key}</div>
                                <LangTable langs={langs[key]} />
                            </div>
                        ))}
                    </div>
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
                    font-size: 2rem;
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
                .langs-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin: 2rem 1rem;
                    align-items: start;
                }

                .category-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #444;
                    margin-bottom: 1rem;
                    padding-left: 0.5rem;
                }

                .langs-column {
                    display: flex;
                    flex-direction: column;
                    margin-right: 1.5rem;
                }

                @media (max-width: 960px) {
                    .langs-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
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
    const certs = fetchCerts();
    const langs = fetchLanguage();
    return {
        props: {
            exp,
            education,
            certs,
            langs,
        },
    };
};
