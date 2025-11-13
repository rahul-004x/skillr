const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-t-gray-200 px-6 py-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <div className="font-mono text-sm font-bold text-gray-500">
          copyright © 2025 by{" "}
          <a
            href="https://rahulyadav-theta.vercel.app/"
            target="_blank"
            className="text-sm font-bold text-black/95 underline underline-offset-2"
          >
            Rahul
          </a>{" "}
        </div>
        <div className="flex gap-2">
          <a
            href="https://github.com/rahul-004x"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-6 items-center justify-center rounded-sm border border-gray-500 hover:border-gray-400"
          >
            <img src="/footer/github.svg" className="size-4" />
            <span className="sr-only">GithHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-yadav-004x/"
            target="_blank"
            rel="noopener nore"
            className="flex size-6 items-center justify-center rounded-sm border border-gray-500 hover:border-gray-400"
          >
            <img src="/footer/x.svg" className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
