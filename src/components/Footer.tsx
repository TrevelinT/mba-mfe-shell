function LanguageIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
		</svg>
	);
}

function HelpOutlineIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
		</svg>
	);
}

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full py-xl bg-secondary-container dark:bg-on-secondary-fixed-variant">
			<div className="flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto px-margin-mobile md:px-gutter">
				<div className="flex flex-col items-center md:items-start gap-sm">
					<p className="font-headline-md text-headline-md font-bold text-on-secondary-container dark:text-on-secondary-fixed m-0">
						Game Store
					</p>
					<small className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim m-0">
						© {currentYear} Game Store Inc. Todos os direitos reservados.
					</small>
				</div>
				<nav aria-label="Rodapé">
					<ul className="flex flex-wrap justify-center gap-md list-none m-0 p-0">
						<li id="footer-privacy-policy">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-privacy-policy"
							>
								Política de Privacidade
							</a>
						</li>
						<li id="footer-terms-of-service">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-terms-of-service"
							>
								Termos de Uso
							</a>
						</li>
						<li id="footer-shipping-info">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-shipping-info"
							>
								Informações de Entrega
							</a>
						</li>
						<li id="footer-returns">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-returns"
							>
								Devoluções
							</a>
						</li>
						<li id="footer-contact-us">
							<a
								className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
								href="#footer-contact-us"
							>
								Fale Conosco
							</a>
						</li>
					</ul>
				</nav>
				<ul className="flex gap-md">
					<li>
						<button
							aria-label="Selecionar idioma"
							className="text-on-secondary-container"
							type="button"
						>
							<LanguageIcon />
						</button>
					</li>
					<li>
						<button
							aria-label="Ajuda"
							className="text-on-secondary-container"
							type="button"
						>
							<HelpOutlineIcon />
						</button>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export { Footer };
