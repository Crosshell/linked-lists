import { CircularLinkedList } from '../src/circularLinkedList';

describe('CircularLinkedList', () => {
  let list: CircularLinkedList;
  const TEST_ELEMENT_A = 'a';
  const TEST_ELEMENT_B = 'b';
  const TEST_ELEMENT_C = 'c';

  beforeEach(() => {
    list = new CircularLinkedList();
  });

  const checkRingIntegrity = (list: CircularLinkedList) => {
    if (list.length() === 0) {
      expect(list['head']).toBeNull();
      return;
    }

    let current = list['head'];
    let count = 0;
    const size = list.length();

    do {
      current = current!.next;
      count++;
    } while (current !== list['head'] && count <= size + 1);

    expect(count).toBe(size);
  };

  describe('append()', () => {
    it('should maintain ring structure', () => {
      list.append(TEST_ELEMENT_A);
      expect(list['head']?.next).toBe(list['head']);

      list.append(TEST_ELEMENT_B);
      expect(list['head']?.next?.next).toBe(list['head']);
    });
  });

  describe('delete()', () => {
    it('should keep ring after deleting last element', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.delete(1);
      checkRingIntegrity(list);
    });
  });

  describe('deleteAll()', () => {
    it('should handle full list deletion', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_A);
      list.deleteAll(TEST_ELEMENT_A);
      expect(list.length()).toBe(0);
      checkRingIntegrity(list);
    });
  });

  describe('reverse()', () => {
    it('should reverse ring structure', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_C);
      list.reverse();

      expect(list.get(0)).toBe(TEST_ELEMENT_C);
      expect(list.get(1)).toBe(TEST_ELEMENT_B);
      expect(list.get(2)).toBe(TEST_ELEMENT_A);
      checkRingIntegrity(list);
    });
  });

  describe('findLast()', () => {
    it('should find in circular structure', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_A); // Индексы: 0:a, 1:b, 2:a
      expect(list.findLast(TEST_ELEMENT_A)).toBe(2);
    });
  });

  describe('extend()', () => {
    it('should merge two circular lists', () => {
      const other = new CircularLinkedList();
      other.append(TEST_ELEMENT_B);
      other.append(TEST_ELEMENT_C);

      list.append(TEST_ELEMENT_A);
      list.extend(other);

      checkRingIntegrity(list);
      expect(list.findLast(TEST_ELEMENT_C)).toBe(2);
    });
  });

  describe('length()', () => {
    it('should return 0 for empty list', () => {
      expect(list.length()).toBe(0);
    });

    it('should reflect correct size after mutations', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.delete(0);
      expect(list.length()).toBe(1);
    });
  });

  describe('append()', () => {
    it('should add elements to end maintaining order', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);

      expect(list.get(0)).toBe(TEST_ELEMENT_A);
      expect(list.get(1)).toBe(TEST_ELEMENT_B);
      expect(list.length()).toBe(2);
    });
  });

  describe('insert()', () => {
    it('should insert between existing elements', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_C);
      list.insert(TEST_ELEMENT_B, 1);

      expect(list.get(1)).toBe(TEST_ELEMENT_B);
      expect(list.length()).toBe(3);
    });

    it('should throw for invalid indexes', () => {
      expect(() => list.insert(TEST_ELEMENT_A, -1)).toThrow(
        'Index out of bounds',
      );
      expect(() => list.insert(TEST_ELEMENT_A, 1)).toThrow(
        'Index out of bounds',
      );
    });
  });

  describe('delete()', () => {
    it('should remove element and shift remaining', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      const deleted = list.delete(0);

      expect(deleted).toBe(TEST_ELEMENT_A);
      expect(list.get(0)).toBe(TEST_ELEMENT_B);
      expect(list.length()).toBe(1);
    });

    it('should throw for invalid indexes', () => {
      expect(() => list.delete(-1)).toThrow('Index out of bounds');
      list.append(TEST_ELEMENT_A);
      expect(() => list.delete(1)).toThrow('Index out of bounds');
    });
  });

  describe('deleteAll()', () => {
    it('should remove all matching elements', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_A);
      list.deleteAll(TEST_ELEMENT_A);

      expect(list.findFirst(TEST_ELEMENT_A)).toBe(-1);
      expect(list.length()).toBe(1);
      expect(list.get(0)).toBe(TEST_ELEMENT_B);
    });

    it('should handle non-existing elements', () => {
      list.append(TEST_ELEMENT_B);
      list.deleteAll(TEST_ELEMENT_A);
      expect(list.length()).toBe(1);
    });
  });

  describe('get()', () => {
    it('should return correct element', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      expect(list.get(1)).toBe(TEST_ELEMENT_B);
    });

    it('should throw for invalid access', () => {
      expect(() => list.get(0)).toThrow('Index out of bounds');
      list.append(TEST_ELEMENT_A);
      expect(() => list.get(1)).toThrow('Index out of bounds');
    });
  });

  describe('clone()', () => {
    it('should create independent copy', () => {
      list.append(TEST_ELEMENT_A);
      const clone = list.clone();
      clone.append(TEST_ELEMENT_B);

      expect(list.length()).toBe(1);
      expect(clone.length()).toBe(2);
      expect(clone.get(1)).toBe(TEST_ELEMENT_B);
    });
  });

  describe('reverse()', () => {
    it('should reverse multi-element list', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_C);
      list.reverse();

      expect(list.get(0)).toBe(TEST_ELEMENT_C);
      expect(list.get(1)).toBe(TEST_ELEMENT_B);
      expect(list.get(2)).toBe(TEST_ELEMENT_A);
    });

    it('should handle single-element list', () => {
      list.append(TEST_ELEMENT_A);
      list.reverse();
      expect(list.get(0)).toBe(TEST_ELEMENT_A);
    });
  });

  describe('findFirst()', () => {
    it('should return correct positions', () => {
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);

      expect(list.findFirst(TEST_ELEMENT_B)).toBe(0);
      expect(list.findFirst(TEST_ELEMENT_C)).toBe(-1);
    });

    it('should handle empty list', () => {
      expect(list.findFirst(TEST_ELEMENT_A)).toBe(-1);
    });
  });

  describe('findLast()', () => {
    it('should return last occurrence', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.append(TEST_ELEMENT_A);

      expect(list.findLast(TEST_ELEMENT_A)).toBe(2);
      expect(list.findLast(TEST_ELEMENT_C)).toBe(-1);
    });
  });

  describe('clear()', () => {
    it('should reset list state', () => {
      list.append(TEST_ELEMENT_A);
      list.append(TEST_ELEMENT_B);
      list.clear();

      expect(list.length()).toBe(0);
      expect(() => list.get(0)).toThrow('Index out of bounds');
    });
  });

  describe('extend()', () => {
    it('should merge lists correctly', () => {
      const other = new CircularLinkedList();
      other.append(TEST_ELEMENT_B);
      other.append(TEST_ELEMENT_C);

      list.append(TEST_ELEMENT_A);
      list.extend(other);

      expect(list.length()).toBe(3);
      expect(list.get(1)).toBe(TEST_ELEMENT_B);
      expect(list.get(2)).toBe(TEST_ELEMENT_C);
    });

    it('should handle empty other list', () => {
      const other = new CircularLinkedList();
      list.append(TEST_ELEMENT_A);
      list.extend(other);
      expect(list.length()).toBe(1);
    });
  });
});
