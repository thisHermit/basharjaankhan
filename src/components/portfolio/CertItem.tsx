import Date from "../Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import { CertContent } from "../../lib/exp_item";

type Props = {
    item: CertContent;
};
export default function CertItem({ item }: Props) {
    return (
        <div className="post-item">
            <div className="post-header">
                <div className="title">{item.title}</div>
                <div className="date-wrapper">
                    <div className="date-range">
                        <Date date={parseISO(item.startDate)} />
                        -
                        {item.endDate ? <Date date={parseISO(item.endDate)} /> : "∞"}
                    </div>
                </div>
            </div>
            <div className="code">{item.issuer}</div>

            <a
                className="institution"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.link}
            </a>

            <div className="code">{item.code}</div>

            {item.description && (
                <div className="description">
                    {item.description}
                </div>
            )}

            <style jsx>
                {`
                .post-item {
                    display: flex;
                    flex-direction: column;
                    margin: 0.75rem 0;
                    padding: 1.5rem;
                    border-radius: 8px;
                    background: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    /* Keeps card from stretching horizontally */
                    width: 100%;
                    box-sizing: border-box;
                }
    
                .post-item:hover {
                    transform: translateX(2px);
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                }
    
                /* Header layout to push date to the right */
                .post-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.25rem;
                }
    
                .title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #222;
                    flex: 1;
                }
    
                .institution {
                    color: #15847d;
                    font-size: 0.9rem;
                    text-decoration: none;
                }
    
                .institution:hover {
                    text-decoration: underline;
                }
    
                .code {
                    font-size: 1rem;
                    color: #444;
                    margin-bottom: 0.5rem;
                }
    
                .date-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    font-size: 0.85rem;
                    color: #888;
                    margin-left: 1rem;
                    text-align: right;
                }
    
                .date-range {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    white-space: nowrap;
                }
    
                .separator {
                    color: #ccc;
                }
    
                .description {
                    margin-top: 0.75rem;
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    /* Ensures text wraps and extends vertically only */
                    white-space: normal;
                    overflow-wrap: break-word;
                }
            `}
            </style>
        </div>
    );
}
