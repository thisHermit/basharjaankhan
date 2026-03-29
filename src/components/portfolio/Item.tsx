import Date from "../Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import { ItemContent } from "../../lib/exp_item";
import { useState } from 'react';

type Props = {
    item: ItemContent;
};
export default function Item({ item }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="post-item">
            <div className="post-header">
                <div className="title-container">
                    <div className="title">{item.title}</div>
                    <a className="institution" href={item.company.link} target="_blank" rel="noopener noreferrer">
                        {item.company.name}
                    </a>
                </div>

                <div className="date-wrapper">
                    <div className="date-range">
                        <Date date={parseISO(item.startDate)} />
                        -
                        <Date date={parseISO(item.endDate)} />
                    </div>
                    <a
                        className="location"
                        href={`https://maps.google.com/maps/search/${item.location.replace(" ", "%20")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.location}
                    </a>
                </div>
            </div>

            <div className="summary">
                <ul>
                    {item.summary.map((li, index) => <li key={index}>{li}</li>)}
                </ul>
            </div>

            {isExpanded && <div className="description">{item.description}</div>}

            {item.description && <button
                className="read-more"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Show less' : 'Read more'}
            </button>}

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
                }
    
                .post-item:hover {
                    transform: translateX(2px);
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                }
    
                .post-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.5rem;
                }
    
                .title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #222;
                    flex: 1;
                    margin-bottom: 0.25rem;
                }

                .institution {
                    color: #15847d;
                }

                .institution:hover {
                    text-decoration: underline;
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
    
    
                .location {
                    color: #15847d;
                    text-decoration: none;
                    font-size: 0.75rem;
                    margin-top: 2px;
                }
    
                .location:hover {
                    text-decoration: underline;
                }
    
                .summary {
                    color: #444;
                    font-size: 1rem;
                    line-height: 1.5;
                    flex-grow: 0;
                    display: flex;
                    // word-wrap: break-word;
                }

                .summary ul {
                    margin: 0.5rem 0;
                    padding-left: 1.2rem;
                    flex-grow: 0;
                    list-style-position: outside;
                }

                .description {
                    margin-top: 0.75rem;
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    padding-top: 0.75rem;
                }
    
                .read-more {
                    margin-top: 1rem;
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 0.8rem;
                    cursor: pointer;
                    padding: 0;
                    width: fit-content;
                }
    
                .read-more:hover {
                    color: #555;
                }
            `}
            </style>
        </div>
    );
}
