import {
  MdBusiness,
  MdFilePresent,
  MdLibraryBooks,
  MdPerson,
} from "react-icons/md";
import { RiUser2Fill } from "react-icons/ri";

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

// eslint-disable-next-line import/prefer-default-export
export const ItensMenu: Array<NavItem> = [
  {
    label: "Matrículas",
    href: "/matriculas",
    icon: MdFilePresent,
  },
  {
    label: "Alunos",
    href: "/alunos",
    icon: MdPerson,
  },
  {
    label: "Oficinas",
    href: "/oficinas",
    icon: MdLibraryBooks,
  },
  {
    label: "Instituição",
    href: "/instituicao",
    icon: MdBusiness,
  },
  {
    label: "Usuário",
    href: "/usuario",
    icon: RiUser2Fill,
  },
];
