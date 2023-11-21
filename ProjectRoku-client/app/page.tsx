import QRCode from 'react-qr-code';
import { IP_ADDRESS } from '#/constant';

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">TSC Message Dissemination</h1>

      <div className="space-y-10 text-white">
        <div key={'section.name'} className="space-y-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Welcome to the Standing Church Dissemination
          </div>
          <p>You can get started by clicking on any of the messages</p>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className='flex bg-white p-3 m-auto md:m-0 rounded-lg' style={{ height: '256px', width: '256px' }}>
              <QRCode
                value={`http://${IP_ADDRESS}:3000`}
                size={256}
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  width: '100%',
                }}
                viewBox={'0 0 256 256'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
