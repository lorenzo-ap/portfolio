import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import PageTitle from './PageTitle';

interface PageProps extends PropsWithChildren {
  title: string;
}

const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <PageTitle title={title} />

      <AnimatePresence mode='wait'>
        <motion.div
          key={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Page;
