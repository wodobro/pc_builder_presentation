import { SectionLabel } from '@/components/shared/SectionLabel';
import qrcodeImg from '@/assets/images/qrcode.png';

export function QRCode() {
  return (
    <section id="qrcode" className="relative flex flex-col justify-center items-center bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-8)] px-6 w-full h-screen snap-start pointer-events-auto">
      <div className="w-full max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-[var(--gray-1)] text-4xl md:text-5xl">Part 2 Build Session / QR Code</h2>
        <p className="mx-auto max-w-2xl text-[var(--gray-3)] text-lg">
          Scan the QR code to let us know if u would be interested in a build together session.
        </p>

        <div className="flex justify-center mt-8">
          <div className="flex justify-center items-center bg-transparent rounded-lg w-auto h-200 overflow-hidden">
            <img src={qrcodeImg} alt="QR Code" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
