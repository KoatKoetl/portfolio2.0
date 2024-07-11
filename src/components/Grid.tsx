import { BentoGridItem } from '@/components/ui/Bento-grid';
import { gridItems } from '@/data';

const Grid = () => {
  return (
    <section id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
        {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }, i) => (
          <BentoGridItem
            id={id}
            key={i}
            title={title}
            description={description}
            className={className}
            img={img}
            imgClassName={imgClassName}
            titleClassName={titleClassName}
            spareImg={spareImg}
          />
        ))}
      </div>
    </section>
  );
};

export default Grid;
