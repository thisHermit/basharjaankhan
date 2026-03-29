import { useState } from 'react';

// Component inside your file
export default function LangTable({ category, langs }) {
    const [expandedRow, setExpandedRow] = useState(null);
    const proficiencyLabels = ["Beginner", "Amateur", "Competent", "Proficient", "Expert"];

    const toggleRow = (index, hasDesc) => {
        if (!hasDesc) return;
        setExpandedRow(expandedRow === index ? null : index);
    };

    const transformDescription = (description: string) => {
        const regex = /<([^>]+)>(\S+)/g;
        const parts = description.split(regex);

        if (parts.length === 1) return description;

        const result = []

        for (let i = 0; i < parts.length; i += 3) {
            result.push(parts[i]);

            if (parts[i + 1] && parts[i + 2]) {
                result.push(
                    <a
                        key={i}
                        href={parts[i + 2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="description-link"
                    >
                        {parts[i + 1]}
                    </a>
                );
            }
        }
        return <div>{result}</div>
    }

    return (
        <div className="languages-container">
            <table className="langs-table">
                <thead>
                    <tr>
                        <th className='skill-header'>{category.includes("Language") ? "Language" : category.includes("Tools") ? "Tools" : "Skills"}</th>
                        <th className="level-header">Level</th>
                    </tr>
                </thead>
                <tbody>
                    {langs.map((item, index) => {
                        const hasDesc = !!item.description;
                        const isExpanded = expandedRow === index;
                        const num = parseInt(item.level);
                        const isNumeric = !isNaN(num);

                        return (
                            <>
                                <tr
                                    className={`table-row ${hasDesc ? 'clickable' : ''}`}
                                    onClick={() => toggleRow(index, hasDesc)}
                                    title={isNumeric ? proficiencyLabels[num - 1] : ""}
                                >
                                    <td className="name-cell">
                                        <strong>{item.name} {hasDesc ? "*" : ""}</strong>
                                    </td>
                                    <td className="level-cell">
                                        {isNumeric ? <div className="bubble-container">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <span key={i} className={`bubble ${i <= num ? 'filled' : ''}`} />
                                            ))}
                                        </div> : <span className="level-badge">{item.level}</span>}
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr className="description-row">
                                        <td colSpan={2}>
                                            <div className="description-content">
                                                {transformDescription(item.description)}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>

            <style jsx>
                {`
                    .languages-container {
                        margin-top: 1rem;
                        padding: 1.25rem;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        width: 100%;
                    }

                    .langs-table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    th {
                        color: #888;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 0.7rem;
                        padding-bottom: 0.75rem;
                        border-bottom: 1px solid #eee;
                    }

                    .level-header { text-align: right; }

                    .skill-header {text-align: left; }

                    td { padding: 0.85rem 0; border-bottom: 1px solid #f9f9f9; }

                    .table-row { transition: all 0.2s ease; }
                    
                    .table-row.clickable { cursor: pointer; }
                    
                    .table-row:hover { transform: translateX(4px); }

                    .name-cell { color: #222; font-size: 1rem; text-transform: capitalize; }

                    .level-cell { text-align: right; }

                    /* Bubble Styles */
                    .bubble-container {
                        display: flex;
                        gap: 4px;
                        justify-content: flex-end;
                    }

                    .bubble {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #e4e4e7;
                        display: inline-block;
                    }

                    .bubble.filled {
                        background: #15847d; /* Matching your institution color */
                    }

                    .level-badge {
                        background: #f4f4f5;
                        color: #666;
                        padding: 4px 10px;
                        border-radius: 6px;
                        font-size: 0.8rem;
                        font-weight: 500;
                        text-transform: uppercase;
                    }

                    /* Description Animation */
                    .description-row td {
                        padding: 0;
                        border-bottom: 1px solid #f9f9f9;
                    }

                    .description-content {
                        padding: 0.75rem 1rem;
                        background: #fcfcfc;
                        color: #666;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-left: 3px solid #15847d;
                        margin-bottom: 0.5rem;
                    }
                `}
            </style>
        </div>
    );
};