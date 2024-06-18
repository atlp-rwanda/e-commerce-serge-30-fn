interface linkProp {
  text: string;
  href: string;
}
interface LinksProps {
  title: string;
  links: linkProp[];
}
const FooterLinks = ({ title, links }: LinksProps) => {
  return (
    <div>
      <h1 className="font-bold">{title}</h1>
      <ul className="pt-4 flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
