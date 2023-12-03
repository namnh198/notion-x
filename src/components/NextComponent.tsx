/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react'
import isEqual from 'react-fast-compare'

export const wrapNextImage = (NextImage: any): React.FC<any> => {
  return React.memo(
    ({ src, alt, width, height, className, style, layout, ...rest }) => (
      <NextImage
        className={className}
        src={src}
        alt={alt}
        width={layout === 'intrinsic' && width}
        height={layout === 'intrinsic' && height}
        objectFit={style?.objectFit}
        objectPosition={style?.objectPosition}
        layout={layout || (width && height ? 'intrinsic' : 'fill')}
        {...rest}
      />
    ),
    isEqual
  )
}

export const wrapNextLink =
  (NextLink: any): React.FC<any> =>
  ({ href, as, passHref, prefetch, replace, scroll, shallow, locale, ...linkProps }) => (
    <NextLink
      href={href}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <a {...linkProps} />
    </NextLink>
  )
