/*
 * @Description:
 * @Version: 1.0
 * @Autor: dyy
 * @Date: 2021-05-14 21:27:20
 * @LastEditors: dyy
 * @LastEditTime: 2021-05-16 21:07:22
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TreeHelper {
  constructor() {}
  generateTree(data, parentId) {
    const itemArr: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      if (node.parentId === parentId) {
        let children = this.generateTree(data, node.key);
        if (children != null) {
          node.children = children;
        } else {
          node.isLeaf = true;
        }
        itemArr.push(node);
      }
    }
    return itemArr.length > 0 ? itemArr : null;
  }
}
