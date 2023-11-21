import { Item } from "#/lib/demos";
import clsx from "clsx";
import Link from 'next/link';
import { useSelectedLayoutSegment } from "next/navigation";
import { Directory } from "./global-nav";
import { handleSplit } from "#/app/audio/[audioId]/page";

function GlobalNavItem({
    item,
    close,
    className
}: {
    item: Item;
    className?: string;
    close: () => false | void;
}) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;
    return (
        <Link
            onClick={close}
            href={`/audio/${encodeURIComponent(`${item.slug}`)}`}
            className={`${clsx(
                'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
                {
                    'text-gray-400 hover:bg-gray-800': !isActive,
                    'text-white': isActive,
                },
            )} ${className}`}
        >
            {item.name}
        </Link>
    );
}


export const List = ({ items, depth, close }: { items: Directory[]; depth: number; close: () => void }) => {
    console.log('this is the audioFile', {audioFile: items})
    return (
        <div>
            {items.map((item, i) => {
                const isLast = i === items.length - 1;

                return (
                    <div
                        key={item.path}
                        className={
                            clsx(
                                'relative ml-5 pt-2',
                                // Use the border of pseudo elements to visualize hierarchy
                                // │
                                'before:absolute before:-left-2.5 before:top-0 before:border-l-2 before:border-gray-800',
                                // ──
                                'after:absolute after:-left-2.5 after:top-[17px] after:h-3 after:w-2.5 after:border-t-2 after:border-gray-800',
                                {
                                    // ├─
                                    'before:h-full': !isLast,
                                    // └─
                                    'before:h-[17px]': isLast,
                                },
                            )
                        }
                    >
                        <div className="flex gap-x-1">
                            <div
                                className={clsx(
                                    'rounded-md px-2 py-0.5 text-xs tracking-wide',
                                    {
                                        // 'bg-vercel-blue text-blue-100': item.type === 'client',
                                        // 'bg-gray-700 text-gray-200': item.type === 'server',
                                    },
                                )}
                            >
                                {handleSplit(item.path || '').pop() || ""}
                            </div>
                        </div>
                        {item.audioFiles?.map((audioFile, id) => (
                            <GlobalNavItem
                                className={
                                    clsx(
                                        'relative ml-5 pt-2',
                                        // Use the border of pseudo elements to visualize hierarchy
                                        // │
                                        'before:absolute before:-left-2.5 before:top-0 before:border-l-2 before:border-gray-800',
                                        // ──
                                        'after:absolute after:-left-2.5 after:top-[17px] after:h-3 after:w-2.5 after:border-t-2 after:border-gray-800',
                                        {
                                            // ├─
                                            'before:h-full': !isLast,
                                            // └─
                                            'before:h-[17px]': isLast,
                                        },
                                    )
                                }
                                key={`${audioFile}-${id}`} item={{ name: handleSplit(audioFile).pop() || "", slug: audioFile }} close={close} />
                        ))}
                        {item.directories ? (
                            <List key={`${i} + ${depth}`} items={item.directories} depth={depth + 1} close={close} />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};
