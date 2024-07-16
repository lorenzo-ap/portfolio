import { AnimatePresence, motion } from "framer-motion";
import PageTitle from "./PageTitle";
import { PropsWithChildren } from "react";

interface PageProps extends PropsWithChildren {
  title: string;
  key: string;
}

const Page = ({ title, key, children }: PageProps) => {
  return (
    <>
      <PageTitle title={title} />

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Page;
