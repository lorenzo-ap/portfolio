import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import PageTitle from './PageTitle';

interface PageProps extends PropsWithChildren {
  key: string;
  title: string;
}

const Page = ({ key, title, children }: PageProps) => {
  return (
    <>
      <PageTitle title={title} />

      <AnimatePresence mode='wait'>
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Page;
