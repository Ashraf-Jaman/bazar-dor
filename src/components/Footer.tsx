
const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e3e8e3] bg-[#fbfdfb] px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
        {/* Left text */}
        <p className="text-[11px] leading-5 text-[#5f685f] sm:text-xs">
          বাজার দর — প্রয়োজনীয় পণ্যের দামের এক নজরে।
        </p>

        {/* Right text */}
        <p className="text-[11px] leading-5 text-[#5f685f] sm:text-xs">
          সকল দাম সাময়িক; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
