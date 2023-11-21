import Image from 'next/image';

export default function Byline({ className }: { className: string }) {
  return (
    <div
      className={`${className} w-44 bg-vc-border-gradient inset-x-0 bottom-3 right-3 mx-3 rounded-lg p-px shadow-lg shadow-black/20`}
    >
      <div className="flex flex-col justify-between space-y-2 rounded-lg bg-black p-3.5 lg:px-5 lg:py-3">
        <div className="flex items-center gap-x-1.5">
          <div className="text-sm text-gray-400">By</div>
          <a href="https://thestandingchurch.com" title="The Standing Church">
            <div className="w-16 text-gray-100 hover:text-gray-50">
              <Image src="/The Standing Church.png" alt="church logo" width={128} height={128} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
