import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const customSort = (a: any, b: any) => {
  const kpopHistoryOrder = [
    "first-generation",
    "second-generation",
    "third-generation",
    "fourth-generation",
    "global-expansion",
  ]

  const aOrder = kpopHistoryOrder.indexOf(a.slugSegment)
  const bOrder = kpopHistoryOrder.indexOf(b.slugSegment)

  if (aOrder !== -1 && bOrder !== -1) {
    return aOrder - bOrder
  }

  if (aOrder !== -1) return -1
  if (bOrder !== -1) return 1

  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  return a.isFolder ? -1 : 1
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ggamel/template-knowledge-base-docs",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: customSort,
      }),
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: customSort,
      }),
    ),
  ],
  right: [],
}