import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const kpopHistoryOrder: Record<string, number> = {
  "first-generation": 1,
  "second-generation": 2,
  "third-generation": 3,
  "fourth-generation": 4,
  "global-expansion": 5,
}

const customSort = (a: any, b: any) => {
  const aOrder = kpopHistoryOrder[a.name]
  const bOrder = kpopHistoryOrder[b.name]

  if (aOrder !== undefined && bOrder !== undefined) {
    return aOrder - bOrder
  }

  if (aOrder !== undefined) return -1
  if (bOrder !== undefined) return 1

  if ((!a.file && !b.file) || (a.file && b.file)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  return a.file ? 1 : -1
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